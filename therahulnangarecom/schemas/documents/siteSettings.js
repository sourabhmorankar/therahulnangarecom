import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Your Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Your Professional Title',
      description: 'e.g., Sr. Cloud Network & Automation Engineer',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'resumePDF',
      title: 'Resume PDF',
      description: 'Upload your resume file here.',
      type: 'file',
      options: {
        accept: '.pdf',
      },
    }),
  ],
})