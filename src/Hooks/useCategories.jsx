import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useCategories() {
    function getCategories() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
      }
    

    let categoriesInfo = useQuery({
      queryKey: ["categories"],
      queryFn: getCategories,
      staleTime: 7000,
    });
    

    return categoriesInfo;
}
