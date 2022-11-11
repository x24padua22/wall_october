const Mysql = require("mysql");
const DBConnection = require("../models/connection")

class UserModel {

    constructor(){}

    getUser = async (where_fields, where_params) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let get_user_query = Mysql.format(`SELECT * FROM users WHERE ${where_fields};`, where_params);
            response_data = await DBConnection.executeQuery(get_user_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    createUser = async (user_data) => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let create_user_query = Mysql.format(`INSERT INTO users SET ?, created_at = NOW();`, user_data);
            response_data = await DBConnection.executeQuery(create_user_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }

    getPostsComments = async () => {
        let response_data = { status: false, result: {}, error: null };

        try{
            let get_posts_comments_query = Mysql.format(`
                SELECT 
                    posts.id, posts.post, DATE_FORMAT(posts.created_at, "%M %D %Y") AS created_at,
                    CONCAT(users.first_name, " ", users.last_name) AS posted_by,
                    (
                        SELECT JSON_OBJECTAGG(comments.id, JSON_ARRAY(comments.comment, CONCAT(users.first_name, " ", users.last_name), DATE_FORMAT(comments.created_at, "%M %D %Y")))
                        FROM comments
                        INNER JOIN users ON users.id = comments.user_id
                        WHERE comments.post_id = posts.id
                    ) AS comments
                FROM wall.posts
                INNER JOIN users ON users.id = posts.user_id
                ORDER BY posts.id DESC;
            `);
            response_data = await DBConnection.executeQuery(get_posts_comments_query);
        }
        catch(error){
            response_data.error = error;
        }

        return response_data;
    }
}


module.exports = new UserModel();