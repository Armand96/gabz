import { of } from "rxjs";

export class ResponseDto<T> {
    message: string;
    data: T[] | T;
    status: number;
    err: any;

    toJson() {
        const ress: ResponseDto<T> = new ResponseDto<T>();
        if (this.message?.length != 0) ress.message = this.message;
        if (this.status != null) ress.status = this.status;
        if (this.data != null) ress.data = this.data;

        this.clear();

        return ress;
    }

    mapData = (data: T[]) => {
        this.status = 200;
        this.message = "OK";
        this.data = data;
        return this.toJson();
    };

    handleError = (err: any) => of({
        status: 500,
        message: "Server Error",
        error: err
    })

    private clear() {
        delete this.message;
        delete this.status;
        delete this.data;
    }
}