const CommentModel = require("../models/comment.model");
const { checkFields } = require("../helpers/index.helper");

class CommentController {
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

    createComment = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let check_fields = checkFields(["post_id", "comment"], this.#req.body);

            if(check_fields.status){
                let create_comment = await CommentModel.createComment({ ...check_fields.result, user_id: this.#user.user_id });

                if(create_comment.status && create_comment.result.affectedRows){
                    response_data.result = {
                        comment_id: create_comment.result.insertId,
                        comment: check_fields.result.comment
                    }
                    response_data.status = true;
                }
                else{
                    response_data.error = "Error encountered while commenting!";
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

    deleteComment = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let check_fields = checkFields(["comment_id"], this.#req.body);

            if(check_fields.status){
                let delete_comment = await CommentModel.deleteComment({ ...check_fields.result, user_id: this.#user.user_id });

                if(delete_comment.status && delete_comment.result.affectedRows){
                    response_data.status = true;
                }
                else{
                    response_data.error = "You are not allowed to delete a comment you did not comment or 30 minutes already passed.";
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

module.exports = CommentController;