import { Injectable, WritableSignal, inject, signal } from "@angular/core";
import { User } from "../interfaces/user.interface";
import { Router } from "@angular/router";

@Injectable({ providedIn: 'root' })
export class UserService {

    users: WritableSignal<Array<User>> = signal([]);
    router = inject(Router);

    navigatePage = (navigatePath: string) => {
        this.router.navigate([navigatePath]);
    }

}