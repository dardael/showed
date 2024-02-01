import { Maintainer } from 'showed/models/maintainer';
import connection from 'showed/lib/core/database/connection';
import { stringToObjectId } from 'showed/lib/core/database/utils';

interface MaintainerFilter {
    page?: number;
    limit?: number;
}

export async function getMaintainers(filter: MaintainerFilter = {}) {
    try {
        await connection();

        const page = filter.page ?? 1;
        const limit = filter.limit ?? 10;
        const skip = (page - 1) * limit;

        const maintainers = await Maintainer.find()
            .skip(skip)
            .limit(limit)
            .lean()
            .exec();

        const results = maintainers.length;

        return {
            maintainers: maintainers,
            page,
            limit,
            results,
        };
    } catch (error) {
        return { error };
    }
}

export async function createMaintainer(email: string) {
    try {
        await connection();
        const maintainer = await Maintainer.create({ email });
        return {
            maintainer,
        };
    } catch (error) {
        return { error };
    }
}

export async function getMaintainer(id: string) {
    try {
        await connection();

        const parsedId = stringToObjectId(id);

        if (!parsedId) {
            return { error: 'Maintainer not found' };
        }

        const maintainer = await Maintainer.findById(parsedId).lean().exec();
        if (maintainer) {
            return {
                maintainer,
            };
        } else {
            return { error: 'Maintainer not found' };
        }
    } catch (error) {
        return { error };
    }
}

export async function updateMaintainer(
    id: string,
    {
        email,
        name,
        surname,
    }: { email?: string; name?: string; surname?: string }
) {
    try {
        await connection();

        const parsedId = stringToObjectId(id);

        if (!parsedId) {
            return { error: 'Maintainer not found' };
        }

        const maintainer = await Maintainer.findByIdAndUpdate(
            parsedId,
            { email, name, surname },
            { new: true }
        )
            .lean()
            .exec();

        if (maintainer) {
            return {
                maintainer,
            };
        } else {
            return { error: 'Maintainer not found' };
        }
    } catch (error) {
        return { error };
    }
}

export async function deleteMaintainer(id: string) {
    try {
        await connection();

        const parsedId = stringToObjectId(id);

        if (!parsedId) {
            return { error: 'Maintainer not found' };
        }

        const maintainer = await Maintainer.findByIdAndDelete(parsedId).exec();

        if (maintainer) {
            return {};
        } else {
            return { error: 'Maintainer not found' };
        }
    } catch (error) {
        return { error };
    }
}
