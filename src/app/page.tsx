import { redirect } from 'next/navigation';
import { getPages } from 'showed/controllers/page/pageController';

export default async function Home() {
    const response = await getPages();
    const page = response[0];
    redirect('/page/' + page._id + '?id=' + page._id);
}
