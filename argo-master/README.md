# argo
MMVP

### Schema
Below is the `user` schema for the `users` collection in mongoDB in JSON format.

    "_id": ObjectId,
    "isVerified": Boolean,
    "firstName": String,
    "lastName": String,
    "email": String,
    "password": String,
    "traits" : [
        {
            "name": String,
            "domain": String,
            "genotype": [
                {
                    "rsId": Number,
                    "allele": String,
                    "oddsRatio": Float or null
                }    
            ],
            "userDescription": String,
            "providerDescription": String
        }, ...
    ],
    "createdAt": Date,
    "updatedAt": Date,
    "__v": Number

The definitions of the keys are as follows:

Key | Definition
--- | ---
`_id` | Unique `ObjectId` assigned by MongoDB upon entry indexing.
`isVerified` | Determines whether user has completed email verification.
`firstName` | User's first name.
`lastName` | User's last name.
`email` | User's email.
`password` | Argon2id hash of user's password.
`traits` | Array of user's traits.
`traits.name` | Formatted name of the trait.
`traits.domain` | Domain of the trait (i.e. "athletics", "skincare", etc...). These must be standardized.
`traits.genotype` | Array of Objects corresponding to SNP data.
`traits.genotype.rsId` | The integer portion of the SNP rsid.
`traits.genotype.allele` | Corresponding allele variant of the given SNP.
`traits.genotype.oddsRatio` | The odds ratio computed as a float if applicable, otherwise `null`.
`traits.userDescription` | Text the user sees corresponding to a description of their results for the given trait.
`traits.providerDescription` | Text the service provider sees corresponding to a description of the user's results for the given trait as well as actionable items.
`createdAt` | Date when the user entry was created (corresponds to registration date).
`updatedAt` | Date when user entry was last modified.
`__v` | Version key provided by `Mongoose` (more info [here](https://stackoverflow.com/questions/12495891/what-is-the-v-field-in-mongoose)).

There is a sample of JSON formatted traits in the `traits.json` file on the `development` branch [here](https://github.com/duncster94/argo/blob/development/traits.json).
