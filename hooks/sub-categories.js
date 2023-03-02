import useSWR from 'swr'
import filter from 'lodash/filter'

const fetcher = async () => {
  let resp = await fetch(`https://nyeawo.com/apis/categories.php`)
  let data = await resp.json()

  const only_first_level_categories = data.product_categories.length ? filter(data.product_categories,function(o){return o.folder_level === 0 }) : []


  return only_first_level_categories
    }

    
    export const useGetSubCategories = ()=> {
      const { data, error } = useSWR(`/get_sub_categories`, fetcher)
    
      return {
        categories: data,
        isLoading: !error && !data,
        isError: error
      }
  
    }