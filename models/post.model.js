const Mysql = require("mysql");
const DBConnection = require("../models/connection")

class PostModel {
    constructor(){}

    createPost = async (post_data) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let create_post_query = Mysql.format(`INSERT INTO posts SET ?, created_at = NOW();`, post_data);
            response_data = await DBConnection.executeQuery(create_post_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    deletePost = async (params) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let delete_post_query = Mysql.format(`DELETE FROM posts WHERE id = ? AND user_id = ? AND created_at >= DATE_SUB(NOW(), INTERVAL 30 MINUTE)`, [params.post_id, params.user_id]);
            response_data = await DBConnection.executeQuery(delete_post_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}

module.exports = new PostModel();