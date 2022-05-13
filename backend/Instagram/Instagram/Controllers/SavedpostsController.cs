using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Instagram.Data;
using Instagram.Models;

namespace Instagram.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SavedpostsController : ControllerBase
    {
        private readonly PostsContext _context;

        public SavedpostsController(PostsContext context)
        {
            _context = context;
        }

        // GET: api/Savedposts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Savedpost>>> GetSavedpost()
        {
            return await _context.Savedpost.ToListAsync();
        }

        // GET: api/Savedposts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Savedpost>> GetSavedpost(int id)
        {
            var savedpost = await _context.Savedpost.FindAsync(id);

            if (savedpost == null)
            {
                return NotFound();
            }

            return savedpost;
        }

        // PUT: api/Savedposts/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSavedpost(int id, Savedpost savedpost)
        {
            if (id != savedpost.id)
            {
                return BadRequest();
            }

            _context.Entry(savedpost).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SavedpostExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Savedposts
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Savedpost>> PostSavedpost(Savedpost savedpost)
        {
            _context.Savedpost.Add(savedpost);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSavedpost", new { id = savedpost.id }, savedpost);
        }

        // DELETE: api/Savedposts/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Savedpost>> DeleteSavedpost(int id)
        {
            var savedpost = await _context.Savedpost.FindAsync(id);
            if (savedpost == null)
            {
                return NotFound();
            }

            _context.Savedpost.Remove(savedpost);
            await _context.SaveChangesAsync();

            return savedpost;
        }

        private bool SavedpostExists(int id)
        {
            return _context.Savedpost.Any(e => e.id == id);
        }
    }
}
