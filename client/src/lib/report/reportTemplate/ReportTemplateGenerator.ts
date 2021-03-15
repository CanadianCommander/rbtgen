import Report from "@/lib/report/Report";
import ReportSqlGenerator from "@/lib/report/sql/ReportSqlGenerator";
import ReportParameterTemplateGenerator from "@/lib/report/reportTemplate/ReportParameterTemplateGenerator";

export default class ReportTemplateGenerator
{
  // ==========================================================
  // Public class methods
  // ==========================================================

  public static generateReportTemplate(report: Report): string
  {
    return `<report title="${report.name}" description="" active="1" meta="Generated With rbtGen!">
<query>
${ReportSqlGenerator.generateSql(report)}
</query>
${ReportParameterTemplateGenerator.generateParameterTemplates(report.reportModel.parameters)}
</report>`;
  }
}
