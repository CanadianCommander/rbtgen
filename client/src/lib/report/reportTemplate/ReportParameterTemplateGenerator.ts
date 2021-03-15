import ReportParameter from "@/lib/report/reportModel/ReportParameter";

export default class ReportParameterTemplateGenerator
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  /**
   * generate the template xml for a parameter
   * @param param
   */
  public static generateParameterTemplate(param: ReportParameter)
  {
    return `<param id="${param.id}" type="${param.type}" description="${param.description}"> </param>`;
  }

  /**
   * generate the template xml for a list of parameters
   * @param params
   */
  public static generateParameterTemplates(params: ReportParameter[])
  {
    return params.map((param) => `${this.generateParameterTemplate(param)}`).join("\n");
  }
}
