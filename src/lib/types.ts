export interface SanityAsset {
	_ref: string;
	_type: 'reference';
}

export interface SanityFile {
	_type: 'file';
	asset: SanityAsset & {
		url: string;
	};
}

export interface SanityImage {
	_type: 'image';
	asset: SanityAsset;
}

export interface SiteSettings {
	_type: 'siteSettings';
	name: string;
	title: string;
	resumePDF: SanityFile;
}

export interface Experience {
	_type: 'experience';
	role: string;
	company: string;
	companyLogo?: SanityImage;
	startDate: string;
	endDate?: string;
	summary: string[];
}

export interface Certification {
	_type: 'certification';
	title: string;
	issuer?: string;
	logo: SanityImage;
	issueDate?: string;
}

export interface Skill {
	_type: 'skill';
	title: string;
	category: 'networking' | 'cloud' | 'automation' | 'data' | 'tools';
	logo?: SanityImage;
}