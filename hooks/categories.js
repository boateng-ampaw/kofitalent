import useSWR from 'swr'
import filter from 'lodash/filter'

const fetcher = async (url) => {
  let resp = await fetch(url)
  let data = await resp.json()

  const only_first_level_categories = data.product_categories.length ? filter(data.product_categories,function(o){return o.folder_level === 0 }) : []


  return only_first_level_categories
    }

    
    export const useGetCategories = ()=> {
      const { data, error } = useSWR(`https://nyeawo.com/apis/categories.php`, fetcher)
    
      return {
        categories: data,
        isLoading: !error && !data,
        isError: error
      }
  
    }