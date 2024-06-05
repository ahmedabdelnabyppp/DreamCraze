import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { HeaderInterceptor } from "./interceptor/header-interceptor..service";

export const httpInterceptorProvider={
    provide:HTTP_INTERCEPTORS,
    useClass:HeaderInterceptor,
    multi:true
}