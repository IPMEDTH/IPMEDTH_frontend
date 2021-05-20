import axios from 'axios';
import $ from 'jquery';

export default function api() {
    const api = axios.create({
        baseURL: 'http://127.0.0.1:8000',
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
        }
    })

    return api
}
