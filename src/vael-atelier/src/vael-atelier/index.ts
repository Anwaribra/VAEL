import "./styles/atelier.css";

export { CollectionSection } from "./collection/CollectionSection";
export type { CollectionSectionProps } from "./collection/CollectionSection";
export { TemplateGallery } from "./collection/TemplateGallery";
export { TemplateCard } from "./collection/TemplateCard";
export { PreviewDrawer } from "./collection/PremiumPreviewDrawer";

export { InvitationBuilder } from "./builder/InvitationBuilder";
export type { InvitationBuilderProps } from "./builder/InvitationBuilder";

export { InvitationRenderer } from "./InvitationRenderer";
export type { InvitationRendererProps } from "./InvitationRenderer";

export { templates, freeTemplates, premiumTemplates, getTemplate } from "./templates";
export { BLOCK_TYPES, blocksForTemplate, sampleData, withDefaults, placeBlock } from "./blocks";
export {
  SELECTED_TEMPLATE_KEY,
  DRAFT_KEY,
  saveSelectedTemplateId,
  readSelectedTemplateId,
  resolveInitialTemplateId,
  createUrl,
  requestUrl,
} from "./storage";
export { strings } from "./i18n";
export type * from "./types";
