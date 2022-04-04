import httpService from "./http.service";

const productsEndPoint = "products/";

const productsService = {
    get: async () => {
        const req = await httpService.get(productsEndPoint);
        return req.data;
    }
};
export default productsService;
