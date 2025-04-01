const connection = require("./connection");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());


app.get("/api/testomonial", (req, res) => {
  connection.query("SELECT * FROM testomonial", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching testimonials");
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.get("/api/testomonial/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "SELECT * FROM testomonial WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonial by ID");
      } else {
        console.log(rows);
        if (rows.length === 0) {
          res.status(404).send("Testimonial not found");
        } else {
          res.json(rows[0]);
        }
      }
    }
  );
});

app.delete("/api/testomonial/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM testomonial WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonial by ID");
      } else {
        console.log(rows);
        if (rows.length === 0) {
          res.status(404).send("Testimonial not found");
        } else {
          res.json(rows[0]);
        }
      }
    }
  );
});

app.post("/api/testomonial", (req, res) => {
  const data = req.body;
  const tesData = [data.name, data.details, data.image];

  connection.query(
    "INSERT INTO testomonial (name, details, image) VALUES (?)",
    [tesData],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonials");
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

app.patch("/api/testomonial", (req, res) => {
  var data = req.body;
  connection.query(
    "UPDATE testomonial SET ? WHERE id = " + data.id,
    [data],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonials");
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

app.put("/api/testomonial", (req, res) => {
  var data = req.body;
  connection.query(
    "UPDATE testomonial SET ? WHERE id = " + data.id,
    [data],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonials");
      } else {
        if (rows.affectedRows == 0) {
          var tesData = [data.name, data.details, data.image];
          connection.query(
            "INSERT INTO testomonial (name, details, image) VALUES (?)",
            [tesData],
            (err, rows) => {
              if (err) {
                console.error(err);
                res.status(500).send("Error fetching testimonials");
              } else {
                console.log(rows);
                res.json(rows);
              }
            }
          );
        } else {
          res.json(rows);
        }
      }
    }
  );
});

app.get("/api/contact", (req, res) => {
  connection.query("SELECT * FROM contact", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching testimonials");
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.delete("/api/contact/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM contact WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching testimonial by ID");
    } else {
      console.log(rows);
      if (rows.length === 0) {
        res.status(404).send("Testimonial not found");
      } else {
        res.json(rows[0]);
      }
    }
  });
});

app.post("/api/contact", (req, res) => {
  console.log("Request Body: ", req.body);

  const data = req.body;
  const tesData = [
    data.name,
    data.email,
    data.phone,
    data.company,
    data.job_title,
    data.job_details,
  ];

  const query = `
    INSERT INTO contact (name, email, phone, company, job_title, job_details) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  connection.query(query, tesData, (err, rows) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send("Database error");
    }
    res.json({ message: "Contact data saved successfully", rows });
  });
});

app.put("/api/contact", (req, res) => {
  var data = req.body;
  connection.query(
    "UPDATE contact SET ? WHERE id = " + data.id,
    [data],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonials");
      } else {
        if (rows.affectedRows == 0) {
          const tesData = [
            data.name,
            data.email,
            data.phone,
            data.company,
            data.job_title,
            data.job_details,
          ];

          connection.query(
            "INSERT INTO contact (name, email, phone, company, job_title, job_details) VALUES (?)",
            [tesData],
            (err, rows) => {
              if (err) {
                console.error(err);
                res.status(500).send("Error fetching testimonials");
              } else {
                console.log(rows);
                res.json(rows);
              }
            }
          );
        } else {
          res.json(rows);
        }
      }
    }
  );
});

app.get("/api/blog", (req, res) => {
  connection.query("SELECT * FROM blog", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching testimonials");
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});
app.get("/api/blog/:id", (req, res) => {
  const { id } = req.params;
  connection.query("SELECT * FROM blog WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching showCase by ID");
    } else {
      console.log(rows);
      if (rows.length === 0) {
        res.status(404).send("showCase not found");
      } else {
        res.json(rows[0]);
      }
    }
  });
});

app.delete("/api/blog/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM blog WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching testimonial by ID");
    } else {
      console.log(rows);
      if (rows.length === 0) {
        res.status(404).send("Testimonial not found");
      } else {
        res.json(rows[0]);
      }
    }
  });
});

app.post("/api/blog", (req, res) => {
  console.log("Request Body: ", req.body);

  const data = req.body;
  const tesData = [data.title, data.image, data.descriptions];

  const query = `
    INSERT INTO blog (title, image, descriptions) 
    VALUES (?, ?, ?)
  `;

  connection.query(query, tesData, (err, rows) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send("Database error");
    }
    res.json({ message: "blog data saved successfully", rows });
  });
});

app.put("/api/blog", (req, res) => {
  var data = req.body;
  connection.query(
    "UPDATE blog SET ? WHERE id = " + data.id,
    [data],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonials");
      } else {
        if (rows.affectedRows == 0) {
          const tesData = [data.title, data.image, data.descriptions];
          const query = `
            INSERT INTO blog (title, image, descriptions) 
            VALUES (?, ?, ?)
        `;
          connection.query(query, [tesData], (err, rows) => {
            if (err) {
              console.error(err);
              res.status(500).send("Error fetching testimonials");
            } else {
              console.log(rows);
              res.json(rows);
            }
          });
        } else {
          res.json(rows);
        }
      }
    }
  );
});

app.get("/api/showCase", (req, res) => {
  connection.query("SELECT * FROM showCase", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching showCase");
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.delete("/api/showCase/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM showCase WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching showCase by ID");
    } else {
      console.log(rows);
      if (rows.length === 0) {
        res.status(404).send("showCase not found");
      } else {
        res.json(rows[0]);
      }
    }
  });
});

app.post("/api/showCase", (req, res) => {
  const data = req.body;
  const tesData = [data.name, data.company, data.image, data.job_details];

  connection.query(
    "INSERT INTO showCase (name, company, image ,job_details) VALUES (?)",
    [tesData],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonials");
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

app.put("/api/showCase", (req, res) => {
  var data = req.body;
  connection.query(
    "UPDATE showCase SET ? WHERE id = " + data.id,
    [data],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonials");
      } else {
        if (rows.affectedRows == 0) {
          const tesData = [
            data.name,
            data.company,
            data.image,
            data.job_details,
          ];

          connection.query(
            "INSERT INTO showCase (name, company, image ,job_details) VALUES (?)",
            [tesData],
            (err, rows) => {
              if (err) {
                console.error(err);
                res.status(500).send("Error fetching testimonials");
              } else {
                console.log(rows);
                res.json(rows);
              }
            }
          );
        } else {
          res.json(rows);
        }
      }
    }
  );
});

app.get("/api/newsletters", (req, res) => {
  connection.query("SELECT * FROM newsletters", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching newsletters");
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.post("/api/newsletters/subscribe", (req, res) => {
  const data = req.body;
  const newsData = [data.email];
  connection.query(
    "INSERT INTO newsletters (email) VALUES (?)",
    [newsData],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching newsletters");
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

app.delete("/api/newsletters/:id", (req, res) => {
  const { id } = req.params;
  connection.query(
    "DELETE FROM newsletters WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonial by ID");
      } else {
        console.log(rows);
        if (rows.length === 0) {
          res.status(404).send("Testimonial not found");
        } else {
          res.json(rows[0]);
        }
      }
    }
  );
});

app.put("/api/newsletters", (req, res) => {
  var data = req.body;
  connection.query(
    "UPDATE newsletters SET ? WHERE id = " + data.id,
    [data],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonials");
      } else {
        if (rows.affectedRows == 0) {
          const { id } = req.params;
          connection.query(
            "INSERT INTO newsletters (email) VALUES (?)",
            [newsData],
            (err, rows) => {
              if (err) {
                console.error(err);
                res.status(500).send("Error fetching newsletters");
              } else {
                console.log(rows);
                res.json(rows);
              }
            }
          );
        } else {
          res.json(rows);
        }
      }
    }
  );
});

app.get("/api/about", (req, res) => {
  connection.query("SELECT * FROM about", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching about");
    } else {
      console.log(rows);
      res.json(rows);
    }
  });
});

app.post("/api/about", (req, res) => {
  const data = req.body;
  const newsData = [data.descriptions, data.image];
  connection.query(
    "INSERT INTO about (descriptions, image) VALUES (?)",
    [newsData],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching About");
      } else {
        console.log(rows);
        res.json(rows);
      }
    }
  );
});

app.delete("/api/about/:id", (req, res) => {
  const { id } = req.params;
  connection.query("DELETE FROM about WHERE id = ?", [id], (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error fetching about by ID");
    } else {
      console.log(rows);
      if (rows.length === 0) {
        res.status(404).send("About not found");
      } else {
        res.json(rows[0]);
      }
    }
  });
});

app.put("/api/about", (req, res) => {
  var data = req.body;
  connection.query(
    "UPDATE about SET ? WHERE id = " + data.id,
    [data],
    (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send("Error fetching testimonials");
      } else {
        if (rows.affectedRows == 0) {
          const newsData = [data.descriptions, data.image];
          connection.query(
            "INSERT INTO about (descriptions, image) VALUES (?)",
            [newsData],
            (err, rows) => {
              if (err) {
                console.error(err);
                res.status(500).send("Error fetching About");
              } else {
                console.log(rows);
                res.json(rows);
              }
            }
          );
        } else {
          res.json(rows);
        }
      }
    }
  );
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
