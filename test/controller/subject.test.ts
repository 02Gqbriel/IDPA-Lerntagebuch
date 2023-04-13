import { spec } from "pactum";
import * as SubjectDao from "../../src/model/subjectDao";
import { string, int } from "pactum-matchers";
import { server } from "../../src/main";
import { Subject } from "../../src/model/Subject";

const PORT = process.env.PORT ?? 3001;

const username = "z-user-" + Date.now();
const password = "geheim";

let subject: Subject | null = null;
let token: string | null = null;

describe("Server | Subject", () => {
  before(async function () {
    if (!server.listening) {
      server.listen(PORT);
    }

    subject = <Subject>(
      await SubjectDao.insertSubject(new Subject("Mathematik"))
    );

    const formData = new FormData();

    formData.append("username", username);
    formData.append("password", password);
    formData.append("role", "Schüler");

    const res = await fetch(`http://localhost:${PORT}/api/auth/register`, {
      method: "post",
      body: formData,
    });

    if (res.ok) {
      const formData = new FormData();

      formData.append("username", username);
      formData.append("password", password);

      const res = await fetch(`http://localhost:${PORT}/api/auth/login`);

      if (res.ok) {
        const json = await res.json();

        token = json.token;
      }
    }
  });

  it("Soll alle Fächer/Themen zurückbekommen", async () => {
    if (token == null) throw new Error("Thema ist null");

    await spec()
      .get(`http://localhost:${PORT}/api/subject/list`)
      .withBearerToken(token)
      .expectStatus(200)
      .expectHeaderContains("content-type", "application/json");
  });

  it("Soll ein Fächer/Themen zurückbekommen", async () => {
    if (subject == null || token == null)
      throw new Error("Thema oder Token ist null");

    await spec()
      .get(`http://localhost:${PORT}/api/subject/list?id=0`)
      .withBearerToken(token)
      .expectStatus(200)
      .expectHeaderContains("content-type", "application/json");
  });

  after(() => {
    if (server.listening) {
      server.close();
    }
  });
});
