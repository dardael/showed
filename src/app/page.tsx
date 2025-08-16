import { redirect } from 'next/navigation';
import { getPagesWithChildren } from 'showed/controllers/page/pageController';

export default async function Home() {
    const response = await getPagesWithChildren();
    const page = response[0];
    redirect('/page/' + page.urlPart + '?id=' + page.urlPart);
}
