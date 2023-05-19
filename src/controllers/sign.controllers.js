import { db } from "../database/database.connection.js"
import bcrypt from "bcrypt"
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
  res.send("signin")
}
