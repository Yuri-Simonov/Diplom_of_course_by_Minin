import httpService from "./http.service";
const commentEndpoint = "comments/";

const commentService = {
    createComment: async (payload) => {
        const { data } = await httpService.put(
            commentEndpoint + payload._id,
            payload
        );
        return data;
    },
    getComments: async (productId) => {
        const { data } = await httpService.get(commentEndpoint, {
            params: {
                orderBy: '"productId"',
                equalTo: `"${productId}"`
            }
        });
        return data;
    },
    fetchAll: async () => {
        const { data } = await httpService.get(commentEndpoint);
        return data;
    },
    removeComment: async (commentId) => {
        const { data } = await httpService.delete(commentEndpoint + commentId);
        return data;
    }
};
export default commentService;
