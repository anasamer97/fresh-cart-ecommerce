import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useBrands() {
    function getBrands() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
      }
    

    let brandsInfo = useQuery({
      queryKey: ["brands"],
      queryFn: getBrands,
      staleTime: 7000,
    });
    

    return brandsInfo;
}
