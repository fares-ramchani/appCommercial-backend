import mongoose, { model, Schema } from "mongoose";


const familySchema = new mongoose.Schema({
    code: {
        type: Number,
        required: true,
        unique: true
        // Code 
    },
    familyLabel: {
        type: String,
        // Libellé famille
    },
    isProfitMargin: {
        type: Boolean,
        // Marge sur vente
    },
    priceCalculationOn: {
        type: String,
        // calcul prix de vente sur
    },
    minimumViablePriceOn: {
        type: String,
        // calcul prix minimal sur
    },
    purchase: {
        type: Number,
        // Fodec / Achat
    },
    fees: [{
        type: Number,
        // frais
    }],
    fixedFees: {
        type: Number,
        // frais
    },
    profitMargin: {
        type: Number,
        // Marge de vente
    },
    isProfitMarginPlusFees: {
        type: Boolean,
        // Plus frais
    },
    fodec: {
        type: Number,
    },
    tva: {
        type: Number,
    },
    isSubjectToVAT: {
        type: Boolean
        // Soumis à la majoration de la tva
    },
    cict: {
        type: Number,
    },
    minimumMargin: {
        type: Number,
        // Marge minimale
    },
    margin2: {
        value: {
            type: Number,
            // el valeur loula
        },
        discount1: {
            type: Number,
        },
        discount2: {
            type: Number,
        },
        discount3: {
            type: Number,
        }
    },
    margin3: {
        value: {
            type: Number,
            // el valeur loula
        },
        discount1: {
            type: Number,
        },
        discount2: {
            type: Number,
        },
        discount3: {
            type: Number,
        }
    },
    margin4: {
        value: {
            type: Number,
            // el valeur loula
        },
        discount1: {
            type: Number,
        },
        discount2: {
            type: Number,
        },
        discount3: {
            type: Number,
        }
    },
    margin5: {
        value: {
            type: Number,
            // el valeur loula
        },
        discount1: {
            type: Number,
        },
        discount2: {
            type: Number,
        },
        discount3: {
            type: Number,
        }
    },
    accountingAccount: {
        type: String
        // Compte comptable
    },
    accountTitle: {
        type: String
        // Intitulé du compte
    }

})


const Family = model('Family', familySchema);

export default Family
