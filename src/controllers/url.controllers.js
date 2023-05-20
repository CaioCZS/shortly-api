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

    res.status(201).send({ id: 1, shortUrl })
  } catch (err) {
    res.status(500).send(err.message)
  }
}

export async function getUrlById(req, res) {
  res.send("getUrlById")
}

export async function openUrlByShortUrl(req, res) {
  res.send("openUrlByShortUrl")
}

export async function deleteUrlById(req, res) {
  res.send("deleteUrlById")
}
