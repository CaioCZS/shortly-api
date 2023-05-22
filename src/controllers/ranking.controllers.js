import { db } from "../database/database.connection.js"

export async function getRanking(req, res) {
  try {
    const { rows: ranking } = await db.query(`
        SELECT COUNT(urls) AS "linksCount",SUM(COALESCE(urls."visitCount",0)) AS "visitCount",
        users.id as id ,users.name AS name FROM urls 
        FULL JOIN users ON users.id = urls."userId"
        GROUP BY users.id,users.name
        ORDER BY "visitCount" DESC,"linksCount" DESC
        LIMIT 10; `)

    res.send(ranking)
  } catch (err) {
    res.status(500).send(err.message)
  }
}
