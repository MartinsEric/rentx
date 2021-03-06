import { hash } from "bcrypt";
import { v4 as uuid } from "uuid";

import createConnection from "../index";

async function create() {
  const connection = await createConnection("localhost");

  const id = uuid();
  const pass = await hash("admin", 8);

  await connection.query(
    `INSERT INTO USERS(id, name, email, password, "admin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${pass}', 'true', 'now()', 'XXXXXX')    
  `
  );

  await connection.close();
}

create().then(() => console.log("admin user created!"));
