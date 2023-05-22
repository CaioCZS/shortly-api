import { nanoid } from "nanoid"
import { db } from "../database/database.connection.js"

export async function postUrlShorten(req, res) {
  const { url } = req.body
  const session = res.locals.session
  try {
    const shortUrl = nanoid(6)

    await db.query(
      `INSERT INTO urls (url,"userId","shortUrl") VALUES ($1,$2,$3)`,
      [url, session.userId, shortUrl]
    )
    const { rows: idUrl } = await db.query(
      `SELECT id FROM urls WHERE "shortUrl"=$1`,
      [shortUrl]
    )

    res.status(201).send({ id: idUrl[0].id, shortUrl })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getUrlById(req, res) {
  const { id } = req.params

  try {
    const { rows: body } = await db.query(
      `SELECT id,url,"shortUrl" FROM urls WHERE id=$1;`,
      [id]
    )
    if (body.length === 0) {
      return res.status(404).send({ message: "Url encurtada não encontrada" })
    }
    res.send(body[0])
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function openUrlByShortUrl(req, res) {
  const { shortUrl } = req.params
  try {
    const { rows: urlExist } = await db.query(
      `SELECT * FROM urls WHERE "shortUrl"=$1;`,
      [shortUrl]
    )
    if (urlExist.length === 0) {
      return res.status(404).send("Url encurtada não existe")
    }

    await db.query(
      `UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl"=$1;`,
      [shortUrl]
    )

    const url = urlExist[0].url

    return res.redirect(url)
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function deleteUrlById(req, res) {
  const { id } = req.params
  const session = res.locals.session
  try {
    const { rows: urlExist } = await db.query(
      `SELECT id,url,"shortUrl" FROM urls WHERE id=$1;`,
      [id]
    )
    if (urlExist.length === 0) {
      return res.status(404).send({ message: "Url encurtada não encontrada" })
    }

    const { rows: isUrlUser } = await db.query(
      `SELECT * FROM urls WHERE "userId"=$1 AND id =$2;`,
      [session.userId, id]
    )
    if (isUrlUser.length === 0) return res.sendStatus(401)

    await db.query(`DELETE FROM urls WHERE id=$1`, [id])

    res.sendStatus(204)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
