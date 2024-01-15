import {getSession} from "@utility/getSession";
import {redirect} from "@node_modules/next/navigation";

export default async function Home() {
    const session = await getSession();

    if (process.env.APP_ENV !== 'test' && (!session || !session.user)) {
        return redirect('/signin');
    }

    else {
        return redirect('/dashboard');
    }
}
