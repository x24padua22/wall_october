const UserModel       = require("../models/user.model");

class ViewController {
    #req;
    #res;
    
    constructor(req, res){
        this.#req = req;
        this.#res = res;
    }

    homepage = async () => {
        this.#res.render("login.ejs");
    }

    wall = async () => {
        if(this.#req.session.user){
            let records = await UserModel.getPostsComments();

            let view_data = {
                first_name: this.#req.session.user.first_name,
                posts: records.result
            }

            this.#res.render("wall.ejs", { DATA: view_data });
        }
        else{
            this.#res.redirect("/");
        }
    }
}

module.exports = ViewController;