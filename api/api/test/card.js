//During the test the env variable is set to test
require("../../config/db");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../api");

chai.use(chaiHttp);
chai.should();
const expect = chai.expect;

describe("Board", () => {
    /*
    * Test the /DELETE/:cardId route
    */
    describe("DELETE/:cardId card", () => {
        it("should DELETE the card if its closed", (done) => {
            done()
        });
    });
});