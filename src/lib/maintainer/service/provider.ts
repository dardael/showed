'use server';

import {
    createMaintainer,
    deleteMaintainer,
    updateMaintainer,
} from 'showed/lib/maintainer/bridge/database/repository';
import { revalidatePath } from 'next/cache';

/**:
 * Server Action: Create a new maintainer.
 */
export async function createMaintainerAction({
    email,
    path,
}: {
    email: string;
    path: string;
}) {
    await createMaintainer(email);
    revalidatePath(path);
}

/**
 * Server Action: Update an existing maintainer.
 */
export async function updateMaintainerAction(
    id: string,
    update: { email?: string; name?: string; surname?: string },
    path: string
) {
    await updateMaintainer(id, update);
    revalidatePath(path);
}

/**
 * Server Action: Delete a maintainer.
 */
export async function deleteMaintainerAction({
    id,
    path,
}: {
    id: string;
    path: string;
}) {
    await deleteMaintainer(id);
    revalidatePath(path);
}
