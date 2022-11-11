const Mysql = require("mysql");
const DBConnection = require("../models/connection")

class CommentModel {
    constructor(){}

    createComment = async (comment_data) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let create_comment_query = Mysql.format(`INSERT INTO comments SET ?, created_at = NOW();`, comment_data);
            response_data = await DBConnection.executeQuery(create_comment_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    deleteComment = async (params) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let delete_comment_query = Mysql.format(`DELETE FROM comments WHERE id = ? AND user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)`, [params.comment_id, params.user_id]);
            response_data = await DBConnection.executeQuery(delete_comment_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}

module.exports = new CommentModel();