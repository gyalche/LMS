import { Schema, model, Document } from 'mongoose';

interface FaqItem extends Document {
  question: string;
  answer: string;
}

interface category extends Document {
  title: string;
}

interface bannerImage extends Document {
  public_id: string;
  url: string;
}

interface layout extends Document {
  type: string;
  faq: FaqItem[];
  categories: category[];
  banner: {
    image: bannerImage;
  };
  title: string;
  sub_title: string;
}

const faqSchema = new Schema<FaqItem>({
  question: { type: String },
  answer: { type: String },
});

const categorySchema = new Schema<category>({
  title: { type: String },
});

const bannerImageSchema = new Schema<bannerImage>({
  public_id: { type: String },
  url: { type: String },
});

const layoutSchema = new Schema<layout>({
  type: { type: String },
  faq: [faqSchema],
  categories: [categorySchema],
  banner: {
    image: bannerImageSchema,
    title: { type: String },
    subTitle: { type: String },
  },
});

const layoutModel = model<layout>('Layout', layoutSchema);

export default layoutModel;
