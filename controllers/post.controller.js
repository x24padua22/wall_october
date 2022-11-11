const PostModel = require("../models/post.model");
const { checkFields } = require("../helpers/index.helper");

class PostController {
    #req;
    #res;
    #user;

    constructor(req ,res){
        this.#req = req;
        this.#res = res;

        if(this.#req.session && this.#req.session.user != undefined){
            this.#user = this.#req.session.user;
        }
        else{
            this.#res.json({ error: "You must be logged in to access this!" });
        }
    }

    createPost = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let check_fields = checkFields(["post"], this.#req.body);

            if(check_fields.status){
                let create_post = await PostModel.createPost({ post: check_fields.result.post, user_id: this.#user.user_id });

                if(create_post.status && create_post.result.affectedRows){
                    response_data.result = {
                        post_id: create_post.result.insertId,
                        post: check_fields.result.post
                    }
                    response_data.status = true;
                }
                else{
                    response_data.error = "Error encountered while posting!";
                }
            }
            else{
                response_data = check_fields;
            }
        }
        catch(error){
            response_data.error = error;
        }

        this.#res.json(response_data);
    }

    deletePost = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let check_fields = checkFields(["post_id"], this.#req.body);

            if(check_fields.status){
                let delete_post = await PostModel.deletePost({ ...check_fields.result, user_id: this.#user.user_id });

                if(delete_post.status && delete_post.result.affectedRows){
                    response_data.status = true;
                }
                else{
                    response_data.error = "You are not allowed to delete a post you did not post or 30 minutes already passed.";
                }
            }
            else{
                response_data = check_fields;
            }
        }
        catch(error){
            response_data.error = error;
        }

        this.#res.json(response_data);
    }
}

module.exports = PostController;