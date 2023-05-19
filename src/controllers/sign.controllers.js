import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

export async function signup(req, res) {
  const { name, email, password, confirmPassword } = req.body

  if (password !== confirmPassword) {
    return res.status(422).send("Senhas precisam ser iguais")
  }

  try {
    const hash = bcrypt.hashSync(password, 10)

    await db.query(
      `INSERT INTO users (name,email,password) VALUES ($1,$2,$3)`,
      [name, email, hash]
    )

    res.status(201).send("Conta criada com sucesso")
  } catch (err) {
    if (err.code === "23505") {
      return res.status(409).send("E-mail já cadastrado")
    }
    res.status(500).send(err.message)
  }
}

export async function signin(req, res) {
  const { email, password } = req.body

  try {
    const user = await db.query(`SELECT * FROM users WHERE email=$1`, [email])

    if (
      user.rowCount === 0 ||
      !bcrypt.compareSync(password, user.rows[0].password)
    ) {
      return res.status(401).send("E-mail e/ou senha incorretos")
    }
    const userId = user.rows[0].id
    const token = uuid()

    await db.query(`INSERT INTO sessions ("userId",token) VALUES ($1,$2)`, [
      userId,
      token,
    ])
    res.send({ token })
  } catch (err) {
    res.send(err.message)
  }
}
