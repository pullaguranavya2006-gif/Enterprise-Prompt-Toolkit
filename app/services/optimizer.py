def optimize_prompt(prompt: str):

    optimized = prompt

    suggestions = []

    if len(prompt) < 100:
        suggestions.append(
            "Add more context for better results."
        )

    if "example" not in prompt.lower():
        suggestions.append(
            "Include examples to improve clarity."
        )

    if "format" not in prompt.lower():
        suggestions.append(
            "Specify the desired output format."
        )

    optimized += """

Optimization Notes:
- Use clear instructions.
- Avoid ambiguity.
- Include constraints.
"""

    score = 10 - len(suggestions)

    return {
        "optimized_prompt": optimized,
        "quality_score": score,
        "suggestions": suggestions
    }