import useSWR from 'swr'

import { fetcher } from './index'

const API_URL = '/api/catalog'

function useCatalog() {
  const { data, error } = useSWR(API_URL, fetcher)

  return {
    data: data?.data || [],
    isLoading: !error && !data,
    isError: Boolean(error)
  }
}

export default useCatalog