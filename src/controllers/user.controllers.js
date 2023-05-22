import { db } from "../database/database.connection.js"

export async function getUserMe(req, res) {
  const session = res.locals.session
  if (!session) return res.status(401).send("Voce não está logado")
  try {
    const upperBody = await db.query(
      `SELECT SUM(urls."visitCount") AS "visitCount",urls."userId" AS id,users.name FROM urls 
    JOIN users ON users.id = urls."userId"
    WHERE users.id=$1
    GROUP BY users.name,urls."userId";`,
      [session.userId]
    )
    const { rows: urls } = await db.query(
      `
    SELECT * FROM urls WHERE "userId"=$1;
    `,
      [session.userId]
    )

    const mapUrl = urls.map((u) => {
      const obj = { ...u }
      delete obj.userId
      delete obj.createdAt
      return obj
    })

    res.send({ ...upperBody.rows[0], shortenedUrls: [...mapUrl] })
  } catch (err) {
    res.status(500).send(err.message)
  }
}
