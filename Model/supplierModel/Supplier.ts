import mongoose, { model,Schema } from "mongoose";


const supplierSchema = new mongoose.Schema({
  code: {
    type: Number,
    required : true,
    unique: true
    // Code 
  },
  companyName: {
    type: String,
    required : true
    // Raison sociale ou nom 
  },
  abbreviation: {
    type: String,
    // Abréviation
  },
  maxCredit: {
    type: Number,
    // Crédit maximal
  },
  maxTerms: {
    type: Number,
    // Echéanciers maximaux
  },
  inProgress: {
    type: Boolean,
    default: false,
    // Tenir compte des en cours
  },
  address: {
    type: String,
    // Adresse
  },
  city: {
    type: String,
    // Ville
  },
  postalCode: {
    type: String,
    // Code postal
  },
  country: {
    type: String,
    // Pays
  },
  activity: {
    type: String,
    // Activité
  },
  responsible : {
    type: String,
  },
  phone: {
    type: String,
    // Numéro de téléphone
  },
  fax: {
    type: String,
    // Numéro de fax
  },
  email: {
    type: String,
    // Adresse e-mail
  },
  bank: {
    type: String,
    // Banque
  },
  rib: {
    type: String,
    // RIB
  },
  domiciliation: {
    type: String,
    // Domiciliation
  },
  fiscalID: {
    type: String,
    // Matricule fiscal
  },
  payment: {
    type: String,
    // paiement
  },
  daysCount: {
    type: Number,
    // Nbre jours
  },
  delay: {
    type: Number,
    // Délai
  },
  type: {
    type: String,
    // Type
  },
  accounting: {
    type: String,
    // Comptabilité
  },
  nature: {
    type: String,
    // Nature
  },
  currency: {
    type: String,
    // Devise
  },
  agent: {
    type: String,
    // Agent
  },
  isVATSubject: {
    type: Boolean,
    default: false,
    // Assujetti à la TVA
  },
  isBlockedAccount: {
    type: Boolean,
    default: false,
    // Compte bloqué
  },
  isFODECExemption: {
    type: Boolean,
    default: false,
    // Exonération FODEC
  },
  isVATExemption: {
    type: Boolean,
    default: false,
    // Exonération TVA
  },
  isCICTExemption: {
    type: Boolean,
    default: false,
    // Exonération CICT
  },
  isStampExemption: {
    type: Boolean,
    default: false,
    // Exonération timbre
  },
  option1: {
    type: Boolean,
    default: false,
    // Option 1
  },
  option2: {
    type: Boolean,
    default: false,
    // Option 2
  },
  option3: {
    type: Boolean,
    default: false,
    // Option 3
  }
});

const Supplier = model('Supplier', supplierSchema);

export default Supplier
