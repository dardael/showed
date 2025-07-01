import dotenv from 'dotenv';
dotenv.config();

import { getService } from 'showed/lib/core/dependencyInjection/getter';
import Provider from 'showed/lib/maintainer/service/provider';

async function main() {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.error('Please provide a password and an email as parameters.');
        process.exit(1);
    }

    const email = args[0];
    const password = args[1];
    if (typeof email !== 'string' || email.length === 0) {
        console.error('Invalid email. Please provide a non-empty string.');
        process.exit(1);
    }
    if (typeof password !== 'string' || password.length === 0) {
        console.error('Invalid password. Please provide a non-empty string.');
        process.exit(1);
    }
    const maintainerProvider: Provider = getService('MaintainerProvider');
    const maintainer = await maintainerProvider.getMaintainer();
    if (!maintainer) {
        console.log('Create the user with the email: ', email);
        await maintainerProvider.createMaintainer({ email });
    } else if (maintainer && maintainer.email !== email) {
        console.log('modify the user with the email: ', email);
        await maintainerProvider.updateMaintainer(maintainer._id as string, {
            email,
        });
    }
    console.log('Encrypt and save the password');
    await maintainerProvider.savePassword(password);
    console.log('Password saved successfully.');
}
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error('An error occurred:', error);
        process.exit(1);
    });
