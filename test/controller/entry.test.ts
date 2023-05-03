import { spec } from "pactum";
import { server } from "../../src/main";
import { token } from "./auth.test";

const PORT = process.env.PORT ?? 3001;

let entry: number | null = null;

describe("Server | Entry", () => {
  before(async function () {
    if (!server.listening) {
      server.listen(PORT);
    }
  });

  it("Soll ein Eintrag erstellen", async () => {
    if (token == null) throw new Error("Token ist null");

    const resSub = await fetch(`http://localhost:${PORT}/api/subject/list`, {
      headers: { authorization: token },
    });

    if (!resSub.ok) {
      throw new Error("Couldn't recieve subject");
    }

    const { subjectID } = (await resSub.json())[0];

    const res = await spec()
      .post(`http://localhost:${PORT}/api/entry/create`)
      .withHeaders({ authorization: token })
      .withMultiPartFormData({
        title: "TestEntry",
        date: Date.now(),
        subject: subjectID,
      })
      .expectStatus(200)
      .expectHeaderContains("content-type", "application/json");

    console.log(res);

    entry = res.json;
  });

  it("Soll alle Fächer/Themen zurückbekommen", async () => {
    if (token == null) throw new Error("Token ist null");

    await spec()
      .get(`http://localhost:${PORT}/api/subject/list`)
      .withHeaders({ authorization: token })
      .expectStatus(200)
      .expectHeaderContains("content-type", "application/json");
  });

  it("Soll ein Fach/Thema zurückbekommen", async () => {
    if (entry == null || token == null)
      throw new Error("Thema oder Token ist null");

    await spec()
      .get(`http://localhost:${PORT}/api/subject/list?id=${entry}`)
      .withHeaders({ authorization: token })
      .expectStatus(200)
      .expectHeaderContains("content-type", "application/json");
  });

  it("Soll ein Fach/Thema überarbeitet", async () => {
    if (token == null) throw new Error("Token ist null");

    await spec()
      .put(`http://localhost:${PORT}/api/subject/update`)
      .withHeaders({ authorization: token })
      .withMultiPartFormData({ name: "Physik", id: entry })
      .expectStatus(200)
      .expectBody("OK");
  });

  it("Soll ein Fach/Thema löschen", async () => {
    if (token == null) throw new Error("Token ist null");

    await spec()
      .delete(`http://localhost:${PORT}/api/subject/delete?id=${entry}`)
      .withHeaders({ authorization: token })
      .expectStatus(200)
      .expectBody("OK");
  });

  after(() => {
    if (server.listening) {
      server.close();
    }
  });
});
