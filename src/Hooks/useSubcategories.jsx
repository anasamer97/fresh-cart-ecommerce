import { useQuery } from "@tanstack/react-query";
import axios from "axios";


export default function useSubcategories() {
    function getSubcategories(id) {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/categories/6439d5b90049ad0b52b90048/subcategories`);
      }
    

    let subcategoryInfo = useQuery({
      queryKey: ["subcategory"],
      queryFn: getSubcategories,
      staleTime: 7000,
    });
    

    return subcategoryInfo;
}
