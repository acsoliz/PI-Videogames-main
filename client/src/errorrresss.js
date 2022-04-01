import axios from "axios";

// Ejemplo de async y promise:
export function getDogs() {
  return async function (dispatch) {
    var dogs = await axios.get("/dogs");
    return dispatch({
      type: GET_ALL_DOGS,
      payload: dogs.data,
    });
  };
}
export function getDogs() {
  return function (dispatch) {
    return axios.get("/dogs")
    .then((res) => {
      dispatch({
        type: GET_ALL_DOGS,
        payload: res.data,
      });
    });}}


    export const getDetail = (id) => {
        return function (dispatch){
            return axios.get(`${URL_GET}${id}`)
            .then((res)=>{
                dispatch({
                    type    : GET_DETAIL,
                    payload : json.data
                })
            })
        }

        return async function(dispatch) {
            try {
                const json = await axios.get(`${URL_GET}${id}`);
                return dispatch({
                    type    : GET_DETAIL,
                    payload : json.data
                });
            } catch (error) {
                console.log(error);
            }
        };
    };