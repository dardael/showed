import { getPagesWithChildren } from 'showed/controllers/page/pageController';
import PageComponent from 'showed/components/page/page';
import { Page as PageModel } from 'showed/lib/page/models/page';
import { getPersonInCache } from 'showed/controllers/invitation/invitationController';
export default async function Page({ params }: { params: { id: string } }) {
    const response = await getPagesWithChildren();
    const page = response.find((page) => page.urlPart === params.id);
    const person = await getPersonInCache();
    return <PageComponent page={page as PageModel} person={person} />;
}
