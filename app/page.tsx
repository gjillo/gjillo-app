import {getSession} from "@utility/getSession";
import {redirect} from "@node_modules/next/navigation";

export default async function Home() {
    const session = await getSession();

    if (!session || !session.user) {
        return redirect('/signin');
    }

    else {
        return redirect('/dashboard');
    }
}
