import {useMutation, useQuery } from "@tanstack/react-query";
import {queryClient} from "@/providers/react-query-provider";
import {toast} from "sonner";
import {createBrand, getBrands} from "@/src/actions/brand";
import {getMaterialCategory} from "@/src/actions/material-category";
import {getVendors} from "@/src/actions/vendor";


export const useBrandQuery = () => useQuery({
    queryKey: ['brands'],
    queryFn: getBrands
})

export const useData = async () => {
    const brands = await getBrands()
    const categories = await getMaterialCategory()
    const vendors = await getVendors()

    return {
        brands,
        categories,
        vendors
    }
}
