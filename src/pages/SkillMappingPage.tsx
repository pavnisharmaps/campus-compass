import { useState } from 'react';
import { Brain, Plus, X, Search, CheckCircle, AlertCircle, MinusCircle } from 'lucide-react';
import { useCompanies } from '@/hooks/useCompanies';
import { matchSkillsToCompanies } from '@/services/companyService';
import { EmptyState } from '@/components/ui/EmptyState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const suggestedSkills = [
  'Python',
  'Java',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes',
  'Machine Learning',
  'Data Science',
  'SQL',
  'MongoDB',
  'GraphQL',
  'REST APIs',
  'Git',
  'CI/CD',
  'Agile',
  'Product Management',
];

export default function SkillMappingPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [customSkill, setCustomSkill] = useState('');
  const [showResults, setShowResults] = useState(false);

  const { data: companies = [] } = useCompanies();

  const addSkill = (skill: string) => {
    if (skill && !selectedSkills.includes(skill)) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setSelectedSkills(selectedSkills.filter((s) => s !== skill));
  };

  const handleCustomSkillAdd = () => {
    if (customSkill.trim()) {
      addSkill(customSkill.trim());
      setCustomSkill('');
    }
  };

  const handleAnalyze = () => {
    if (selectedSkills.length > 0) {
      setShowResults(true);
    }
  };

  const skillMatches = showResults ? matchSkillsToCompanies(selectedSkills, companies) : [];

  const matchCounts = {
    high: skillMatches.filter((m) => m.matchScore === 'High').length,
    medium: skillMatches.filter((m) => m.matchScore === 'Medium').length,
    low: skillMatches.filter((m) => m.matchScore === 'Low').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground mb-2">Skill Mapping</h1>
        <p className="text-muted-foreground">
          Input your skills to find matching companies and identify preparation areas.
        </p>
      </div>

      {/* Skill Input Section */}
      <div className="intelligence-card">
        <h2 className="text-lg font-semibold text-foreground mb-4">Your Skills</h2>

        {/* Selected Skills */}
        <div className="flex flex-wrap gap-2 mb-4 min-h-[40px]">
          {selectedSkills.length === 0 ? (
            <p className="text-sm text-muted-foreground">No skills selected yet. Add skills below.</p>
          ) : (
            selectedSkills.map((skill) => (
              <span
                key={skill}
                className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="hover:text-primary/70 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))
          )}
        </div>

        {/* Custom Skill Input */}
        <div className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Add a custom skill..."
              className="search-input"
              value={customSkill}
              onChange={(e) => setCustomSkill(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleCustomSkillAdd();
              }}
            />
          </div>
          <Button onClick={handleCustomSkillAdd} variant="outline">
            <Plus className="w-4 h-4" />
          </Button>
        </div>

        {/* Suggested Skills */}
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-3">Suggested Skills</p>
          <div className="flex flex-wrap gap-2">
            {suggestedSkills
              .filter((skill) => !selectedSkills.includes(skill))
              .map((skill) => (
                <button
                  key={skill}
                  onClick={() => addSkill(skill)}
                  className="px-3 py-1.5 rounded-full text-sm bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                >
                  {skill}
                </button>
              ))}
          </div>
        </div>

        {/* Analyze Button */}
        <div className="mt-6 flex justify-end">
          <Button
            onClick={handleAnalyze}
            disabled={selectedSkills.length === 0}
            className="w-full sm:w-auto"
          >
            <Brain className="w-4 h-4 mr-2" />
            Analyze Skill Match
          </Button>
        </div>
      </div>

      {/* Results Section */}
      {showResults && (
        <>
          {companies.length === 0 ? (
            <EmptyState
              icon={Brain}
              title="No companies to match"
              description="Connect to Lovable Cloud to load company data and perform skill matching."
            />
          ) : (
            <>
              {/* Match Summary */}
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="text-sm font-medium text-success">High Match</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{matchCounts.high}</p>
                  <p className="text-xs text-muted-foreground">70%+ skill overlap</p>
                </div>
                <div className="p-4 rounded-lg bg-warning/10 border border-warning/20">
                  <div className="flex items-center gap-2 mb-2">
                    <MinusCircle className="w-5 h-5 text-warning" />
                    <span className="text-sm font-medium text-warning">Medium Match</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{matchCounts.medium}</p>
                  <p className="text-xs text-muted-foreground">40-70% skill overlap</p>
                </div>
                <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertCircle className="w-5 h-5 text-destructive" />
                    <span className="text-sm font-medium text-destructive">Low Match</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground">{matchCounts.low}</p>
                  <p className="text-xs text-muted-foreground">&lt;40% skill overlap</p>
                </div>
              </div>

              {/* Match Results */}
              <div className="space-y-4">
                {skillMatches.map((match) => (
                  <div
                    key={match.company.id}
                    className={cn(
                      'intelligence-card',
                      match.matchScore === 'High' && 'border-l-4 border-l-success',
                      match.matchScore === 'Medium' && 'border-l-4 border-l-warning',
                      match.matchScore === 'Low' && 'border-l-4 border-l-destructive'
                    )}
                  >
                    <div className="flex flex-col lg:flex-row lg:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-foreground">
                            {match.company.name}
                          </h3>
                          <Badge
                            className={cn(
                              match.matchScore === 'High' && 'status-positive',
                              match.matchScore === 'Medium' && 'status-warning',
                              match.matchScore === 'Low' && 'status-negative'
                            )}
                          >
                            {match.matchScore} Match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-4">
                          {match.company.category} • {match.company.focus_sectors}
                        </p>

                        <div className="grid sm:grid-cols-2 gap-4">
                          {/* Matched Skills */}
                          <div>
                            <p className="text-xs font-medium text-success mb-2">Matched Skills</p>
                            <div className="flex flex-wrap gap-1.5">
                              {match.matchedSkills.length > 0 ? (
                                match.matchedSkills.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2 py-0.5 text-xs rounded-full bg-success/10 text-success"
                                  >
                                    {skill}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-muted-foreground">None</span>
                              )}
                            </div>
                          </div>

                          {/* Skill Gaps */}
                          <div>
                            <p className="text-xs font-medium text-warning mb-2">Skill Gaps</p>
                            <div className="flex flex-wrap gap-1.5">
                              {match.skillGaps.length > 0 ? (
                                match.skillGaps.map((skill) => (
                                  <span
                                    key={skill}
                                    className="px-2 py-0.5 text-xs rounded-full bg-warning/10 text-warning"
                                  >
                                    {skill}
                                  </span>
                                ))
                              ) : (
                                <span className="text-xs text-muted-foreground">None</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Preparation Focus */}
                      {match.preparationFocus.length > 0 && (
                        <div className="lg:w-48 p-3 rounded-lg bg-secondary/50">
                          <p className="text-xs font-medium text-muted-foreground mb-2">
                            Priority Preparation
                          </p>
                          <ol className="space-y-1">
                            {match.preparationFocus.map((skill, idx) => (
                              <li key={skill} className="text-sm text-foreground flex items-center gap-2">
                                <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">
                                  {idx + 1}
                                </span>
                                {skill}
                              </li>
                            ))}
                          </ol>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}

      {/* Info Card */}
      <div className="p-4 rounded-lg border border-border bg-muted/30">
        <h3 className="text-sm font-medium text-foreground mb-2">How Skill Matching Works</h3>
        <ul className="text-xs text-muted-foreground space-y-1">
          <li>• Skills are matched against company tech_stack, ai_ml_adoption_level, automation_level, and skill_relevance</li>
          <li>• <span className="text-success">High Match</span>: 70%+ of your skills align with company requirements</li>
          <li>• <span className="text-warning">Medium Match</span>: 40-70% skill overlap</li>
          <li>• <span className="text-destructive">Low Match</span>: Less than 40% overlap (focus areas identified)</li>
          <li>• This is rule-based matching, not AI inference</li>
        </ul>
      </div>
    </div>
  );
}
