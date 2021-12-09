const getters = {

  subjectNo: state => state.subjectDomain.subjectNo,
  root: state => state.rootDomain.root,
  dataHierarchy: state => state.dataHierarchyDomain.dataHierarchy,
  codeSubjectNo: state => state.codeDomain.codeSubjectNo,

  businessTermsData:state => state.businessTerms.businessTermsData,
}
export default getters
