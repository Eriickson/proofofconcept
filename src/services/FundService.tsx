import {setupInterceptorsTo} from "./Interceptors";
import axios, { AxiosResponse } from "axios";
setupInterceptorsTo(axios);

class FundService {

    public getFunds = async (page: number, count: number, term: string, available: boolean | null, income: boolean | null, switchable: boolean | null): Promise<any[]> => {
      const req = await axios.get(`${process.env.REACT_APP_FUNDS_SERVICE}?count=${count}&page=${page}`)
      return req.data
    }
}

const funds = new FundService();

export default funds;