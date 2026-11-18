import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
const html=await readFile(new URL('../dist/index.html',import.meta.url),'utf8');
const hero=html.split('data-hero')[1].split('</section>')[0];
const about=html.split('id="experiencia"')[1].split('</section>')[0];

test('abertura leve move a apresentacao completa para Quem somos sem apagar texto',()=>{
 assert.ok(!hero.includes('A Bétula RH é uma consultoria especializada'));
 assert.ok(hero.includes('Conversar sobre uma contratação'));
 assert.ok(about.includes('A Bétula RH é uma consultoria especializada em Recrutamento e Seleção, que atua desde 2012'));
 assert.ok(about.includes('Conduzimos processos personalizados'));
});

test('cinco diferenciais preservam o texto em detalhes nativos fechados',()=>{
 const section=html.split('id="como-fazemos"')[1].split('</section>')[0];
 const details=[...section.matchAll(/<details\b([^>]*)>([\s\S]*?)<\/details>/g)];
 assert.equal(details.length,5);
 for(const [,attrs,body] of details){assert.doesNotMatch(attrs,/\bopen\b/);assert.match(body,/<summary\b/);assert.match(body,/<p\b/);}
});

test('cinco trajetorias sao expansiveis e Jullyana continua somente foto e nome',()=>{
 const section=html.split('id="equipe"')[1].split('</section>')[0];
 assert.equal((section.match(/<details\b/g)??[]).length,5);
 assert.equal((section.match(/Conhecer trajetória/g)??[]).length,10); // texto visivel e nome acessivel
 const jul=[...section.matchAll(/<article\b[^>]*>([\s\S]*?)<\/article>/g)].find(m=>m[1].includes('>Jullyana</h3>'))?.[1];
 assert.ok(jul);assert.doesNotMatch(jul,/<details\b|<p\b/);
});
