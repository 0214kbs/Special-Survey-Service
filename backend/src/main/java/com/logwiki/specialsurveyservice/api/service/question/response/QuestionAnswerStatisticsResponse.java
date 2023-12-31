package com.logwiki.specialsurveyservice.api.service.question.response;

import com.logwiki.specialsurveyservice.domain.questioncategory.QuestionCategoryType;
import java.util.List;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class QuestionAnswerStatisticsResponse {

    private Long questionId;
    private Long questionNumber;
    private QuestionCategoryType questionCategoryType;
    private List<String> answers;

    @Builder
    public QuestionAnswerStatisticsResponse(Long questionId,
            Long questionNumber,
            QuestionCategoryType questionCategoryType,
            List<String> answers) {
        this.questionId = questionId;
        this.questionNumber = questionNumber;
        this.questionCategoryType = questionCategoryType;
        this.answers = answers;
    }
}
